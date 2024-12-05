import { styles } from '@/app/styles/styles'
import { useRecoveryPasswordMutation } from '@/redux/features/auth/authApi';
import React, { FC, useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { VscWorkspaceTrusted } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

type Props = {
  setRoute: (route: string) => void;
};

type VerifyNumber = {
  "0": string;
  "1": string;
  "2": string;
  "3": string;
};

const Recovery:FC<Props> = ({setRoute}) => {
  const {token} =useSelector((state:any)=>state.auth);
  const [recoveryPassword,{isSuccess,error}] = useRecoveryPasswordMutation();
  const [invalidError, setInvalidError] = useState<boolean>(false);

  useEffect(() => {
    if(isSuccess) {
      toast.success("Account activated successfully! You can now log in.");
      setRoute("Login");
    }

    if(error) {
      if("data" in error) {
        const errorData= error as any ;
        toast.error(errorData.data.message);
        setInvalidError(true);
      }else{
        console.log('An error occured',error);
      }
    }
  },[isSuccess,error]);
  
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  const [verifyNumber, setVerifyNumber] = useState<VerifyNumber>({
    0: "",
    1: "",
    2: "",
    3: "",
  });

  const verificationHandler = async () => {
    const verificationNumber = Object.values(verifyNumber).join("");

    //check user entered the number < 4 numbers
    if(verificationNumber.length !== 4) {
      setInvalidError(true);
      return;
    }

    await recoveryPassword({
      activation_token:token,
      activation_code: verificationNumber,
    })
  };

  const handleInputChange = (index: number, value: string) => {
    setInvalidError(false);
    if(invalidError===false){
      console.log('has changed');
    }
    const newVerifyNumber = { ...verifyNumber, [index]: value };

    setVerifyNumber(newVerifyNumber);

    if (value === "" && index > 0) {
      inputRefs[index - 1].current?.focus();
    } else if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };
  return (
    <div>
      <h1 className={`${styles.title}`}>Recovery password</h1>
      <br />
      <div className="w-full flex items-center justify-center mt-2">
        <div className="w-[80px] h-[80px] rounded-full bg-[#497DF2] flex items-center justify-center">
          <VscWorkspaceTrusted size={40}></VscWorkspaceTrusted>
        </div>
      </div>
      <br />
      <br />
      {/* main content */}
      <div className="flex items-center justify-around m-auto">
        {Object.keys(verifyNumber).map((key, index) => (
          <input
            type="number"
            key={key}
            ref={inputRefs[index]}
            className={`w-[65px] h-[65px] bg-transparent border-[3px] rounded-[10px] flex items-center text-black dark:text-white font-Poppins outline-none text-center
                    ${
                      invalidError
                        ? "shake border-red-500"
                        : "dark:border-white border-[#000]"
                    }`}
            placeholder=""
            maxLength={1}
            value={verifyNumber[key as keyof VerifyNumber]}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        ))}
      </div>
      <br />
      <br />
      <div className="w-full flex items-center">
        <button className={`${styles.button} `} onClick={verificationHandler}>
          Verify OTP
        </button>
      </div>
      <br />
      <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
        Go back to sign in?{""}
        <span
          className="text-[#2190ff] pl-1 cursor-pointer"
          onClick={() => setRoute("Login")}
        >
          Signin
        </span>
      </h5>
    </div>
  )
}

export default Recovery