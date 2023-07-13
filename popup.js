const services = [
    {
        "title": "AI Platform Jobs",
        "url": "https://console.cloud.google.com/ai-platform/jobs"
    },
    {
        "title": "AI Platform Notebooks",
        "url": "https://console.cloud.google.com/ai-platform/notebooks/instances"
    },
    {
        "title": "App Engine",
        "url": "https://console.cloud.google.com/appengine"
    },
    {
        "title": "BigQuery",
        "url": "https://console.cloud.google.com/bigquery"
    },
    {
        "title": "BigQuery Data Transfers",
        "url": "https://console.cloud.google.com/bigquery/transfers"
    },
    {
        "title": "BigQuery Legacy",
        "url": "https://bigquery.cloud.google.com/welcome/{{.ProjectID}}"
    },
    {
        "title": "BigQuery Scheduled Queries",
        "url": "https://console.cloud.google.com/bigquery/scheduled-queries"
    },
    {
        "title": "Bigtable",
        "url": "https://console.cloud.google.com/bigtable"
    },
    {
        "title": "Billing",
        "url": "https://console.cloud.google.com/billing"
    },
    {
        "title": "Cloud Build",
        "url": "https://console.cloud.google.com/cloud-build/builds"
    },
    {
        "title": "Cloud Composer",
        "url": "https://console.cloud.google.com/composer/environments"
    },
    {
        "title": "Cloud Functions",
        "url": "https://console.cloud.google.com/functions/list"
    },
    {
        "title": "Cloud Run",
        "url": "https://console.cloud.google.com/run"
    },
    {
        "title": "Cloud Scheduler",
        "url": "https://console.cloud.google.com/cloudscheduler"
    },
    {
        "title": "Cloud SQL",
        "url": "https://console.cloud.google.com/sql"
    },
    {
        "title": "Cloud Tasks",
        "url": "https://console.cloud.google.com/cloudtasks"
    },
    {
        "title": "Compute Engine",
        "url": "https://console.cloud.google.com/compute/instances"
    },
    {
        "title": "Console",
        "url": "https://console.cloud.google.com/home/dashboard"
    },
    {
        "title": "Container Registry",
        "url": "https://console.cloud.google.com/gcr/images/{{.ProjectID}}"
    },
    {
        "title": "Credentials",
        "url": "https://console.cloud.google.com/apis/credentials"
    },
    {
        "title": "Dataflow",
        "url": "https://console.cloud.google.com/dataflow"
    },
    {
        "title": "Datastore",
        "url": "https://console.cloud.google.com/datastore"
    },
    {
        "title": "Endpoints",
        "url": "https://console.cloud.google.com/endpoints"
    },
    {
        "title": "Error Reporting",
        "url": "https://console.cloud.google.com/errors"
    },
    {
        "title": "Firestore",
        "url": "https://console.cloud.google.com/firestore"
    },
    {
        "title": "IAM & admin",
        "url": "https://console.cloud.google.com/iam-admin/iam/project"
    },
    {
        "title": "Instance Groups",
        "url": "https://console.cloud.google.com/compute/instanceGroups/list"
    },
    {
        "title": "KMS",
        "url": "https://console.cloud.google.com/security/kms"
    },
    {
        "title": "Kubernetes Engine",
        "url": "https://console.cloud.google.com/kubernetes/list"
    },
    {
        "title": "Load Balancing",
        "url": "https://console.cloud.google.com/net-services/loadbalancing/loadBalancers/list"
    },
    {
        "title": "Logs",
        "url": "https://console.cloud.google.com/logs/viewer"
    },
    {
        "title": "Memorystore Redis",
        "url": "https://console.cloud.google.com/memorystore/redis/instances"
    },
    {
        "title": "PubSub",
        "url": "https://console.cloud.google.com/cloudpubsub/topicList"
    },
    {
        "title": "Quotas",
        "url": "https://console.cloud.google.com/iam-admin/quotas"
    },
    {
        "title": "Service Accounts",
        "url": "https://console.cloud.google.com/iam-admin/serviceaccounts"
    },
    {
        "title": "Spanner",
        "url": "https://console.cloud.google.com/spanner/instances"
    },
    {
        "title": "StackDriver",
        "url": "https://console.cloud.google.com/monitoring"
    },
    {
        "title": "StackDriver Legacy",
        "url": "https://app.google.stackdriver.com/"
    },
    {
        "title": "Stackdriver Profiler",
        "url": "https://console.cloud.google.com/profiler/_/cpu"
    },
    {
        "title": "Storage",
        "url": "https://console.cloud.google.com/storage/browser"
    },
    {
        "title": "Task queues Cron",
        "url": "https://console.cloud.google.com/appengine/taskqueues/cron&tab=CRON"
    },
    {
        "title": "Transfer Service Cloud",
        "url": "https://console.cloud.google.com/transfer/cloud"
    },
    {
        "title": "Transfer Service On-Premise",
        "url": "https://console.cloud.google.com/transfer/on-premises/jobs"
    },
    {
        "title": "Cloud DNS",
        "url": "https://console.cloud.google.com/net-services/dns/zones"
    },
    {
        "title": "Secret Manager",
        "url": "https://console.cloud.google.com/security/secret-manager"
    },
    {
        "title": "Artifact Registry",
        "url": "https://console.cloud.google.com/artifacts"
    },
    {
        "title": "Monitoring",
        "url": "https://console.cloud.google.com/monitoring"
    },
    {
        "title": "VPC Networks",
        "url": "https://console.cloud.google.com/networking/networks/list"
    },
    {
        "title": "AlloyDB for PostgreSQL",
        "url": "https://console.cloud.google.com/alloydb/clusters"
    },
    {
        "title": "Trace",
        "url": "https://console.cloud.google.com/traces/overview"
    },
    {
        "title": "Workflows",
        "url": "https://console.cloud.google.com/workflows"
    },
    {
        "title": "Cloud Armor",
        "url": "https://console.cloud.google.com/net-security/securitypolicies/list"
    }
];





function onDOMContentLoaded() {
    chrome.storage.local.get('projects', function (result) {
        let projects = result.projectIDs;
        // Ensure projects is defined and is an array
        if (!Array.isArray(projects)) {
            console.error('Invalid or undefined projects:', projects);
            return;
        }

        function handleProjectSelection(event) {
            const selection = event.detail.selection.value;
            projectAutoCompleteJS.input.value = selection;
            document.getElementById('service').focus();
        }

        function handleServiceSelection(event) {
            const selection = event.detail.selection.value;
            serviceAutoCompleteJS.input.value = selection['title'];
            document.getElementById('service-url').value = selection['url']

            openServiceURL();
        }

        function openServiceURL() {
            const projectName = document.getElementById('project').value;
            const serviceURL = document.getElementById('service-url').value;

            const url = serviceURL + '?project=' + projectName;

            // Open the URL in a new tab
            window.open(url, '_blank');
        }

        const projectAutoCompleteJS = new autoComplete({
            selector: "#project",
            data: {
                src: projects,
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: handleProjectSelection
                }
            }
        });

        const serviceAutoCompleteJS = new autoComplete({
            selector: "#service",
            data: {
                src: services,
                keys: ["title"]
            },
            resultItem: {
                highlight: true
            },
            events: {
                input: {
                    selection: handleServiceSelection
                }
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);
