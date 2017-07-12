node('demo') {
    library 'kubernetes-jenkins-library@master'

    stage('Checkout') {
        git credentialsId: 'gogs-credential', url: 'https://gogs.cn133.azure.net/demo/demo-frontend.git'
    }

    stage('Build') {
        runCommandInContainer {
            image = 'baselibrary/node'
            version = '8.1-alpine'
            workspacePath = '.'
            containerPath = '/app'
            command = 'npm run build'
            envVariables = [[name: 'REACT_APP_API', value: 'http://demo-project']]
        }
    }
    
    stage('Build Image') {
        buildDockerImage {
            service = 'demo-frontend'
            path = '.'
        }
    }

    stage('Deploy: test') {
        deployService {
            environment = 'test'
            service = 'demo-frontend'
            replicas = 1
            servicePort = 80
            containerPort = 8080
        }
    }

    stage('Deploy: uat') {
        input 'Deploy uat?'
        deployService {
            environment = 'uat'
            service = 'demo-frontend'
            replicas = 2
            servicePort = 80
            containerPort = 8080
        }

        def next = input message: 'Need rollback ?', ok: 'OK', parameters: [
            [$class: 'ChoiceParameterDefinition', choices: 'done\nrollback', description: '', name: 'continue or rollback?']
        ]
        if (next == 'rollback') {
            rollbackService {
                environment = 'uat'
                service = 'demo-frontend'
            }
        }
    }

    stage('Deploy: production') {
        input 'Deploy production?'
        deployService {
            environment = 'production'
            service = 'demo-frontend'
            replicas = 2
            servicePort = 80
            containerPort = 8080
        }

        def next = input message: 'Need rollback ?', ok: 'OK', parameters: [
            [$class: 'ChoiceParameterDefinition', choices: 'done\nrollback', description: '', name: 'continue or rollback?']
        ]
        if (next == 'rollback') {
            rollbackService {
                environment = 'production'
                service = 'demo-frontend'
            }
        }
    }
}