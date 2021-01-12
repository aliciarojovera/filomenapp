import { startUi } from '../../firebase'
import React, { Component } from 'react'


class Login extends Component {
    componentDidMount() {
        startUi('#firebaseui')
    }

    render() {
        return (
            <>
            <script src="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.js"></script>
            <link type="text/css" rel="stylesheet" href="https://www.gstatic.com/firebasejs/ui/4.6.1/firebase-ui-auth.css" />
            <div id="firebaseui"></div>
            </>
        )
    }
}

export default Login