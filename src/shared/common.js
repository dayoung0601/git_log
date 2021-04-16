
//nickname 체크 정규식
export const nickNameCheck = (nickName) =>{

    const _reg =/^(?!(?:[0-9]+)$)([a-zA-Z]|[0-9a-zA-Z]){6,}$/;
    return _reg.test(nickName);
}

//패스워드 확인 정규식
export const pwMatch = (pw) => {

    const _reg = /^(?=.*[a-zA-Z])((?=.*\d)|(?=.*\W)).{10,}$/;
    return  _reg.test(pw) && pw.search(/\s/) == -1 ? true : false;
}

export const pwContinuous = (pw) => {

    const _reg = /(\w)\1\1/;
    return _reg.test(pw)
}


//이메일 체크 정규식
export const emailCheck = (email) => {
    //글자체크 aaa_-.123Aaa@aa.com
    let _reg=/^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    
    return _reg.test(email);

}

//깃헙아이디 체크 정규식 
export const githubCheck = (github) => {
    const _reg =/^(?!(?:[0-9]+)$)([-_.a-zA-Z]|[-_.0-9a-zA-Z]){6,}$/;
    return _reg.test(github);
}

// https://github.com/g0garden

