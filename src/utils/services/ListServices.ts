import Service from '../../types/Service';

const services: Service[] = [
  {
    label: 'AI Platform Jobs',
    url: 'https://console.cloud.google.com/ai-platform/jobs',
  },
  {
    label: 'AI Platform Notebooks',
    url: 'https://console.cloud.google.com/ai-platform/notebooks/instances',
  },
  {
    label: 'App Engine',
    url: 'https://console.cloud.google.com/appengine',
  },
  {
    label: 'BigQuery',
    url: 'https://console.cloud.google.com/bigquery',
  },
  {
    label: 'BigQuery Data Transfers',
    url: 'https://console.cloud.google.com/bigquery/transfers',
  },
  {
    label: 'BigQuery Scheduled Queries',
    url: 'https://console.cloud.google.com/bigquery/scheduled-queries',
  },
  {
    label: 'Bigtable',
    url: 'https://console.cloud.google.com/bigtable',
  },
  {
    label: 'Billing',
    url: 'https://console.cloud.google.com/billing',
  },
  {
    label: 'Cloud Build',
    url: 'https://console.cloud.google.com/cloud-build/builds',
  },
  {
    label: 'Cloud Composer',
    url: 'https://console.cloud.google.com/composer/environments',
  },
  {
    label: 'Cloud Functions',
    url: 'https://console.cloud.google.com/functions/list',
  },
  {
    label: 'Cloud Run',
    url: 'https://console.cloud.google.com/run',
  },
  {
    label: 'Cloud Run Jobs',
    url: 'https://console.cloud.google.com/run/jobs',
  },
  {
    label: 'Cloud Scheduler',
    url: 'https://console.cloud.google.com/cloudscheduler',
  },
  {
    label: 'Cloud SQL',
    url: 'https://console.cloud.google.com/sql',
  },
  {
    label: 'Cloud Tasks',
    url: 'https://console.cloud.google.com/cloudtasks',
  },
  {
    label: 'Compute Engine',
    url: 'https://console.cloud.google.com/compute/instances',
  },
  {
    label: 'Console',
    url: 'https://console.cloud.google.com/home/dashboard',
  },
  {
    label: 'Container Registry',
    url: 'https://console.cloud.google.com/gcr',
  },
  {
    label: 'Credentials',
    url: 'https://console.cloud.google.com/apis/credentials',
  },
  {
    label: 'Dataflow',
    url: 'https://console.cloud.google.com/dataflow',
  },
  {
    label: 'Datastore',
    url: 'https://console.cloud.google.com/datastore',
  },
  {
    label: 'Endpoints',
    url: 'https://console.cloud.google.com/endpoints',
  },
  {
    label: 'Error Reporting',
    url: 'https://console.cloud.google.com/errors',
  },
  {
    label: 'Firestore',
    url: 'https://console.cloud.google.com/firestore',
  },
  {
    label: 'IAM & admin',
    url: 'https://console.cloud.google.com/iam-admin/iam/project',
  },
  {
    label: 'Instance Groups',
    url: 'https://console.cloud.google.com/compute/instanceGroups/list',
  },
  {
    label: 'KMS',
    url: 'https://console.cloud.google.com/security/kms',
  },
  {
    label: 'Kubernetes Engine',
    url: 'https://console.cloud.google.com/kubernetes/list',
  },
  {
    label: 'Load Balancing',
    url: 'https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list',
  },
  {
    label: 'Logs',
    url: 'https://console.cloud.google.com/logs/viewer',
  },
  {
    label: 'Memorystore Redis',
    url: 'https://console.cloud.google.com/memorystore/redis/instances',
  },
  {
    label: 'PubSub',
    url: 'https://console.cloud.google.com/cloudpubsub/topicList',
  },
  {
    label: 'Quotas',
    url: 'https://console.cloud.google.com/iam-admin/quotas',
  },
  {
    label: 'Service Accounts',
    url: 'https://console.cloud.google.com/iam-admin/serviceaccounts',
  },
  {
    label: 'Spanner',
    url: 'https://console.cloud.google.com/spanner/instances',
  },
  {
    label: 'StackDriver',
    url: 'https://console.cloud.google.com/monitoring',
  },
  {
    label: 'StackDriver Legacy',
    url: 'https://app.google.stackdriver.com/',
  },
  {
    label: 'Stackdriver Profiler',
    url: 'https://console.cloud.google.com/profiler/_/cpu',
  },
  {
    label: 'Storage',
    url: 'https://console.cloud.google.com/storage/browser',
  },
  {
    label: 'Task queues Cron',
    url: 'https://console.cloud.google.com/appengine/taskqueues/cron&tab=CRON',
  },
  {
    label: 'Transfer Service Cloud',
    url: 'https://console.cloud.google.com/transfer/cloud',
  },
  {
    label: 'Transfer Service On-Premise',
    url: 'https://console.cloud.google.com/transfer/on-premises/jobs',
  },
  {
    label: 'Cloud DNS',
    url: 'https://console.cloud.google.com/net-services/dns/zones',
  },
  {
    label: 'Secret Manager',
    url: 'https://console.cloud.google.com/security/secret-manager',
  },
  {
    label: 'Artifact Registry',
    url: 'https://console.cloud.google.com/artifacts',
  },
  {
    label: 'Monitoring',
    url: 'https://console.cloud.google.com/monitoring',
  },
  {
    label: 'VPC Networks',
    url: 'https://console.cloud.google.com/networking/networks/list',
  },
  {
    label: 'AlloyDB for PostgreSQL',
    url: 'https://console.cloud.google.com/alloydb/clusters',
  },
  {
    label: 'Trace',
    url: 'https://console.cloud.google.com/traces/overview',
  },
  {
    label: 'Workflows',
    url: 'https://console.cloud.google.com/workflows',
  },
  {
    label: 'Cloud Armor',
    url: 'https://console.cloud.google.com/net-security/securitypolicies/list',
  },
  {
    label: 'Vertex AI',
    url: 'https://console.cloud.google.com/vertex-ai',
  },
  {
    label: 'Filestore',
    url: 'https://console.cloud.google.com/filestore',
  },
  {
    label: 'Cloud Vision API',
    url: 'https://console.cloud.google.com/vision',
  },
  {
    label: 'Cloud Source Repositories',
    url: 'https://console.cloud.google.com/code',
  },
  {
    label: 'Security Command Center',
    url: 'https://console.cloud.google.com/security',
  },
  {
    label: 'Cloud CDN',
    url: 'https://console.cloud.google.com/net-services/cdn',
  },
  {
    label: 'Cloud NAT',
    url: 'https://console.cloud.google.com/net-services/nat',
  },
  {
    label: 'Firebase',
    url: 'https://console.firebase.google.com',
  },
  {
    label: 'Cloud Debugger',
    url: 'https://console.cloud.google.com/debug',
  },
  {
    label: 'Cloud Profiler',
    url: 'https://console.cloud.google.com/profiler',
  },
  {
    label: 'Cloud Translation',
    url: 'https://console.cloud.google.com/translation',
  },
  {
    label: 'Cloud Speech-to-Text',
    url: 'https://console.cloud.google.com/speech',
  },
  {
    label: 'Cloud Text-to-Speech',
    url: 'https://console.cloud.google.com/text-to-speech',
  },
  {
    label: 'Cloud Natural Language',
    url: 'https://console.cloud.google.com/natural-language',
  },
  {
    label: 'Recommendations AI',
    url: 'https://console.cloud.google.com/recommendation',
  },
  {
    label: 'AutoML',
    url: 'https://console.cloud.google.com/automl',
  },
  {
    label: 'Cloud Healthcare API',
    url: 'https://console.cloud.google.com/healthcare',
  },
  {
    label: 'Cloud Life Sciences',
    url: 'https://console.cloud.google.com/lifesciences',
  },
  {
    label: 'Binary Authorization',
    url: 'https://console.cloud.google.com/security/binary-authorization',
  },
];

const listServices = () => {
  return services;
};

export default listServices;
