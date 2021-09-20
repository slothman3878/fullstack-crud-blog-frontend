import React, {useState} from "react";
import { 
  Container,
  Form,
  Button,
  InputGroup,
  Row,
} from "react-bootstrap";
import {
  useMutation,
  useQuery,
} from '@apollo/client';

import { CREATE_TYPE } from '../../graphql/mutations/type.mutation';
import { TYPE_EXISTS, TYPES } from '../../graphql/queries/type.query';

const CreateType=()=>{
  const [createType, {loading}] = useMutation(CREATE_TYPE);
  const [name, setName] = useState<string>('');
  const [suptype, setSuptype] = useState<string>('');
  const [desc, setDesc] = useState<string>('');
  const [duplicate, setDuplicate] = useState<boolean>(false); 
  useQuery(TYPE_EXISTS,{
    variables: {
      typeInput: {name: name} // Fetches everytime name value changes
    },
    fetchPolicy: "network-only",
    onCompleted: (d)=>{
      if(d.type) setDuplicate(true);
      else setDuplicate(false);
    }
  });
  const Types = useQuery(TYPES,{
    variables: {
      typesInput: {
        isRoot: true
      }
    },
    fetchPolicy: "network-only",
  })

  const handleSubmit = async(e: React.SyntheticEvent)=>{
    e.preventDefault();
    try{
      await createType({
        variables: {
          createTypeInput: {
            name: name,
            suptype: suptype,
            desc: desc
          }
        }
      });
      // Something indicating success...
      setName(''); setDesc('');
      window.alert("Success!!!")
    } catch(err: any) { 
      if(err.message==='Argument Validation Error') {
        window.alert('Please Provide Valid Arguments')
      }
    }
    Types.refetch();
  }

  return (
    <Container>
      <h2>Create New Type</h2>
      <Form noValidate onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group controlId="formTypeName">
            <Form.Label>Type Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Type Name" value={name}
                onChange={(e)=>{setName(e.target.value)}}
                isValid={!duplicate&&name.length>0&&name.length<=20}
                isInvalid={duplicate||name.length===0||name.length>20}
                />
              <Form.Control.Feedback type="invalid" tooltip>
                {duplicate ? <>Type already exists</>
                : <>Length should be between 1 and 20</>}
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted">
              Type names should be short
            </Form.Text>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group controlId="formTypeDesc">
            <Form.Label>Type Description</Form.Label>
            <InputGroup hasValidation>
              <Form.Control type="text" placeholder="Type Description" value={desc}
                onChange={(e)=>{setDesc(e.target.value)}}
                isValid={desc.length<=255}
                isInvalid={desc.length>255}
                />
              <Form.Control.Feedback type="invalid" tooltip>
                Should be shorter than 255 characters
              </Form.Control.Feedback>
            </InputGroup>
            <Form.Text className="text-muted">
              Be descriptive
            </Form.Text>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" controlId="formSuptype">
            <Form.Label>Parent Type</Form.Label>
            <Form.Select aria-label="select-parent-type" value={suptype}
                onChange={(e: any)=>{setSuptype(e.target.value)}}>
              <option value="">No Parent Type</option>{
              Types.data&&Types.data.types.map((type:{id: string, name: string})=>{
                return <option key={type.id} value={type.id}>{type.name}</option>
              })}
            </Form.Select>
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit"
          disabled={duplicate||name.length===0||name.length>20||loading}
          >
          Submit
        </Button>
      </Form>
    </Container>
  )
}

export default CreateType;