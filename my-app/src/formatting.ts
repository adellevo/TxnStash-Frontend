export const parsePayloadFunction = (funct:string) => {
    
    const func = funct.split('::');
    return { addr: func[0], mod:func[1], scr: func[2], };
}

export const formatTimestamp = (time:string)=>{
    const unix_ts = Number(time);
    const diff = (Date.now()*1000 - unix_ts)/1000000/60/60
    return diff.toFixed(1);
}

export const shortenAddress = (
    account: string | null,
    truncation: number = 4
  ) => {
    if (!account) {
      return "0x????...????";
    }
    if(account.length<4){
        return account
    }
    if(account.slice(0,2)!=='0x'){
        return account
    }

    // if (account.slice(0, 2) === "0x" || account.slice(0, 3) !== "&0x") {
    //     return account;
    // }   
    return (
      account.slice(0, truncation + 2) +
      ".." +
      account.slice(account.length - truncation - 1, account.length)
    );
  };
