/* Lib */
import cx from 'classnames'
import { useEffect, useState } from 'react'
import { Container, Accordion, Card, Button, ListGroup } from 'react-bootstrap'

const Index = (): any => {
  const [cluster, setCluster] = useState([])

  const fetchCluster: any = async () => {
    await fetch('/api/blog')
      .then((res) => res.json())
      .then((result) => {
        setCluster(result)
      })
  }

  useEffect(() => {
    fetchCluster()
  }, [])

  return (
    <>
      <Container className={cx(['mt-5'])}>
        <Accordion defaultActiveKey="0">
          {cluster.length > 0 && (
            <>
              <h1>Assignment 2: Clusters</h1>
              {cluster.map((clusterGroup, i) => (
                <Card key={i}>
                  <Card.Header>
                    <Accordion.Toggle
                      as={Button}
                      variant="link"
                      eventKey={`${i}`}
                    >
                      #{i} Cluster ({clusterGroup.length})
                    </Accordion.Toggle>
                  </Card.Header>
                  <Accordion.Collapse eventKey={`${i}`}>
                    <Card.Body>
                      <ListGroup variant="flush">
                        {clusterGroup.map((clusterItems: any) => (
                          <ListGroup.Item className="text-muted">
                            {clusterItems}
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Accordion.Collapse>
                </Card>
              ))}
            </>
          )}
        </Accordion>
      </Container>
    </>
  )
}

export default Index
