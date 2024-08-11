@description('The Azure region into which the resources should be deployed.')
param location string = 'Sweden Central'

@description('The type of environment. This must be nonprod or prod.')
@allowed([
  'nonprod'
  'prod'
])
param environmentType string

// Will be WebAPI
var webApiAppServiceName = 'aicee-api'
var appServicePlanName = 'aicee-api-plan'

// OldApp / Angular version
var oldAppServiceName = 'aicee-angular'

var reactAppServiceName = 'aicee'



// Define the SKUs for each component based on the environment type.
var environmentConfigurationMap = {
  nonprod: {
    appServicePlan: {
      sku: {
        name: 'F1'
        capacity: 1
      }
    }
  }
  prod: {
    appServicePlan: {
      sku: {
        name: 'F1'
        capacity: 1
      }
    }
  }
}

resource appServicePlan 'Microsoft.Web/serverfarms@2023-01-01' = {
  name: appServicePlanName
  location: location
  sku: environmentConfigurationMap[environmentType].appServicePlan.sku
}

// Will be the WebApi
resource appServiceApp 'Microsoft.Web/sites@2023-01-01' = {
  name: webApiAppServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      appSettings: [
        
      ]
      cors: {
        allowedOrigins: [
          'https://aicee.azurewebsites.net'
        ]
      }
    }
  }
}

// New frontend / React version
resource reactAppServiceApp 'Microsoft.Web/sites@2023-01-01' = {
  name: reactAppServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      appSettings: [
        
      ]
    }
  }
}

// OldApp / Angular version
resource oldAppServiceApp 'Microsoft.Web/sites@2023-01-01' = {
  name: oldAppServiceName
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    httpsOnly: true
    siteConfig: {
      appSettings: [
        
      ]
    }
  }
}


// SQL Server and DB resources

@description('The name of the SQL logical server.')
param serverName string = 'aicee-sql-server'

@description('The name of the SQL Database.')
param sqlDBName string = 'aicee-sql-database'

@description('The administrator username of the SQL logical server.')
param administratorLogin string

@description('The administrator password of the SQL logical server.')
@secure()
param administratorLoginPassword string

resource sqlServer 'Microsoft.Sql/servers@2022-05-01-preview' = {
  name: serverName
  location: location
  properties: {
    administratorLogin: administratorLogin
    administratorLoginPassword: administratorLoginPassword
  }
}

resource sqlDB 'Microsoft.Sql/servers/databases@2022-05-01-preview' = {
  parent: sqlServer
  name: sqlDBName
  location: location
  sku: {
    name: 'Basic'
    tier: 'Basic'
  }
}
