class AuthController {
    constructor() {
        'ngInject';
    }

    $onInit() {
        this.newUser = {
            username: 'test',
            password: 'longlonglongpassword'
        }; 
    }

    $onChanges(changes) {
        console.log(changes);
    }
}

export default AuthController;