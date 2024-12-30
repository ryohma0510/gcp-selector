import Service from '../../types/Service';

const services: Service[] = [
  {
    label: "AI Platform Jobs",
    url: "https://console.cloud.google.com/ai-platform/jobs"
  },
  {
    label: "BigQuery",
    url: "https://console.cloud.google.com/bigquery"
  },
  // 他のサービスも同様に追加
];


const listServices = () => {
  return services;
};

export default listServices;
