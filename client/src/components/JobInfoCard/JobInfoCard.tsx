import {
    MDBBadge,
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBListGroup,
    MDBListGroupItem
} from "mdb-react-ui-kit";
import {JobInfo} from "shared";

interface Props {
    jobData: JobInfo;
}

export default function JobInfoCard({ jobData }: Props) {
    return (
        <MDBCard className="card w-100 my-3 px-0 pb-0">
            <MDBCardTitle>Dados do serviço de 'Web Scraping'</MDBCardTitle>
            <MDBCardBody>
                <MDBListGroup className="text-start" flush>
                    <MDBListGroupItem><strong>Última execução: </strong> {
                        jobData && jobData.lastRun
                            ? new Date(jobData.lastRun).toLocaleString()
                            : 'N/A'
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem><strong>Próxima execução: </strong>{
                        jobData && jobData.nextRun
                            ? new Date(jobData.nextRun).toLocaleString()
                            : 'N/A'
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem><strong>Serviço ativo: </strong>{
                        jobData && jobData.isRunning
                            ? <MDBBadge pill className='mx-2' color='success' light>Sim</MDBBadge>
                            : <MDBBadge pill className='mx-2' color='danger' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem><strong>Serviço parado: </strong>{
                        jobData && jobData.isStopped
                            ? <MDBBadge pill className='mx-2' color='danger' light>Sim</MDBBadge>
                            : <MDBBadge pill className='mx-2' color='success' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem><strong>Serviço em execução: </strong>{
                        jobData && jobData.isBusy
                            ? <MDBBadge pill className='me-2 text-dark' color='warning' light>Sim</MDBBadge>
                            : <MDBBadge pill className='me-2 text-dark' color='light' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCardBody>
        </MDBCard>
    );
}
