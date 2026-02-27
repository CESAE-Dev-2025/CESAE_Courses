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
        <MDBCard shadow='0' className="card w-100 my-3 px-0 pb-0">
            <MDBCardTitle>Dados do serviço de 'Web Scraping'</MDBCardTitle>
            <MDBCardBody className="px-0">
                <MDBListGroup className="text-start" flush>
                    <MDBListGroupItem className="px-3 d-flex gap-1 justify-content-between"><strong>Última execução: </strong> {
                        jobData && jobData.lastRun
                            ? new Date(jobData.lastRun).toLocaleString()
                            : 'N/A'
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem className="px-3 d-flex gap-1 justify-content-between"><strong>Próxima execução: </strong>{
                        jobData && jobData.nextRun
                            ? new Date(jobData.nextRun).toLocaleString()
                            : 'N/A'
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem className="px-3 d-flex gap-1 justify-content-between"><strong>Serviço ativo: </strong>{
                        jobData && jobData.isRunning
                            ? <MDBBadge pill className='mx-0 my-auto px-3 py-2' color='success' light>Sim</MDBBadge>
                            : <MDBBadge pill className='mx-0 my-auto px-3 py-2' color='danger' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem className="px-3 d-flex gap-1 justify-content-between"><strong>Serviço parado: </strong>{
                        jobData && jobData.isStopped
                            ? <MDBBadge pill className='mx-0 my-auto px-3 py-2' color='danger' light>Sim</MDBBadge>
                            : <MDBBadge pill className='mx-0 my-auto px-3 py-2' color='success' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                    <MDBListGroupItem className="px-3 d-flex gap-1 justify-content-between"><strong>Serviço em execução: </strong>{
                        jobData && jobData.isBusy
                            ? <MDBBadge pill className='mx-0 my-auto px-3 py-2 text-dark' color='warning' light>Sim</MDBBadge>
                            : <MDBBadge pill className='mx-0 my-auto px-3 py-2 text-dark' color='light' light>Não</MDBBadge>
                    }
                    </MDBListGroupItem>
                </MDBListGroup>
            </MDBCardBody>
        </MDBCard>
    );
}
