import loginConfig from './user/login.config.js'; 

export default $stateProvider => {
     $stateProvider
        .state('app', {
            url: '/app',
            abstract: true
        })
        .state('login', loginConfig)
}