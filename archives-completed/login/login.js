window.onload = function () {
    const loginText = document.querySelector(".title-text .login");
    const loginForm = document.querySelector("form.login");
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");
    const signupLink = document.querySelector("form .signup-link a");
    signupBtn.onclick = (() => {
        loginForm.style.marginLeft = "-50%";
        loginText.style.marginLeft = "-50%";
    });
    loginBtn.onclick = (() => {
        loginForm.style.marginLeft = "0%";
        loginText.style.marginLeft = "0%";
    });
    signupLink.onclick = (() => {
        signupBtn.click();
        return false;
    });
};



function reg() {
    const loginBtn = document.querySelector("label.login");
    const signupBtn = document.querySelector("label.signup");

    let username = document.getElementById('regUN').value;
    let password1 = document.getElementById('regPW1').value;
    let password2 = document.getElementById('regPW2').value;
    if (username === "" || password1 === "" || password2 === "") {
        alert("即将踏上征途的勇者噢！别着急，请输入您的用户名或密码");
    } else {
        //判断用户名是否已经存在
        if (username in localStorage) {
            alert("哎呀！用户已经存在了，换一个试试把~~");
            document.getElementById('regUN').value = "";
            document.getElementById('regPW1').value = "";
            document.getElementById('regPW2').value = "";
        } else if (password1 !== password2) {
            alert("您输入的两次密码并不一样欸(っ °Д °;)っ");
        }
        else {
            //如果不存在，则将用户名和密码存到网页中
            localStorage.setItem("Sec-Sight-" + username, password1);
            alert("注册成功！！");
            //注册成功，隐藏注册页面，显示登录界面
            loginBtn.click();
        }
    }
}

function log() {
    let logUN = document.getElementById('logUN').value;
    let logPW = document.getElementById('logPW').value;
    //判断用户是否输入数据
    if (logUN === "" || logPW === "") {
        alert("即将踏上征途的勇者噢！别着急，请输入您的用户名或密码");
    } else {
        //判断用户名是否已经注册
        if ("Sec-Sight-" + logUN in localStorage) {
            //如果已经注册，获取用户密码
            let password = localStorage["Sec-Sight-" + logUN];
            //判断用户输入的密码和 注册的密码是否一致
            if (logPW === password) {
                alert("登录成功！");
                document.getElementById('logUN').value = "";
                document.getElementById('logPW').value = "";
                localStorage.setItem("Sec-Sight-current-username", logUN);
                window.open('./game.html','_self');
            } else {
                alert("密码错误");
                document.getElementById('logPW').value = "";
            }
        } else {
            alert("用户不存在，请先注册！");
        }
    }
}








