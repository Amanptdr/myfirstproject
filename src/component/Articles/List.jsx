import React, { useEffect, useState } from "react";
import { ApiActions } from "../../actions/api.actions";
import ReactBootstrapTable from "../React-Bootstrap-table/ReactBootstrapTable";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
export default function ArticalList() {
  const [articleList, setArticleList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isEdit, setIseEdit] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });
  const actions = ApiActions();

  const getArticalsList = async () => {
    let res = await actions.getArticals();
    setArticleList(res?.articles);
  };

  useEffect(() => {
    getArticalsList();
  }, []);

  const headerData = [
    {
      title: "#",
      accessKey: "index",
      sort: false,
      action: function (row, index) {
        return index + 1;
      },
    },
    { title: "TITLE", accessKey: "title", sort: false },
    { title: "MESSAGE", accessKey: "message", sort: true },
    {
      title: "ACTION",
      sort: false,
      action: function (row, index) {
        return (
          <>
            <button
              onClick={(e) => {
                updateArticle(row);
              }}
            >
              EDIT
            </button>
            <button
              onClick={(e) => {
                deleteArticle(row?.id);
              }}
            >
              DELETE
            </button>
          </>
        );
      },
    },
  ];

  const onSubmitForm = async () => {
    let res = isEdit
      ? await actions.updateArticle(formData)
      : await actions.postArticle(formData);
    getArticalsList();
  };
  const updateArticle = async (data) => {
    setFormData({ ...data });
    setShowForm(!showForm);
    setIseEdit(!isEdit);
  };
  const deleteArticle = async (id) => {
    await actions.deleteArticle(id);
    getArticalsList();
  };
  return (
    <>
      <Button
        variant="primary"
        onClick={(e) => {
          setShowForm(!showForm);
        }}
      >
        ADD
      </Button>
      <Container>
        <Row>
          <Col sm={12}>
            <div>
              {articleList && (
                <ReactBootstrapTable
                  headerData={headerData}
                  rowData={articleList}
                />
              )}
            </div>
          </Col>
        </Row>
        {showForm && (
          <Row>
            <div>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="TITLE"
                    value={formData.title}
                    onChange={(e) => {
                      setFormData({ ...formData, title: e.target.value });
                    }}
                  />
                  <Form.Text className="text-muted"></Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>MESSAGE</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="message"
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                    }}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={(e) => {
                    onSubmitForm();
                  }}
                >
                  Submit
                </Button>
              </Form>
            </div>
          </Row>
        )}
      </Container>
    </>
  );
}
