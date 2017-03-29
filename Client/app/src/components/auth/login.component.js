import controller from './auth.controller';

const LoginComponent = {
    bindings: {

    },
    controller,
    template: `
        <div class="list list-inset">
            <label class="item item-input item-floating-label">
                <span class="input-label">Username</span>
                <input type="text" placeholder="Username" ng-model="$ctrl.newUser.username">
            </label>
            <label class="item item-input item-floating-label">
                <span class="input-label">Password</span>
                <input type="password" placeholder="Password" ng-model="$ctrl.newUser.password">
            </label>
        </div>
        <button class="button button-block button-calm" ng-click="login()">Login</button>
    `
}

export default LoginComponent;