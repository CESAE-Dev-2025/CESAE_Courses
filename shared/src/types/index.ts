export type ApiResponse = {
  message: string;
  success: true;
}

export type Course = {
  id: number;
  name: string;
  coverUrl: string;
  startDate: string;
  endDate: string;
  time: string;
  timeDescription: string;
  duration: string;
  regime: string;
  location: string;
  description: string;
  audience: string;
  requirements: string;
  project: string;
  price: string;
  benefits: string;
  goals: string;
  sponsorImgUrl: string;
  courseContent: string;
  enrollment: string;
  hasDownloadButton: boolean;
}