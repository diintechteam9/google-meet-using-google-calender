import { useEffect, useState } from 'react';
import { getMe } from '../services/api';

export function useAuth(){
  const [user,setUser]=useState(null);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    let mounted=true;
    (async()=>{
      try{
        const { data }=await getMe();
        if(mounted) setUser(data);
      }catch(err){
        if(mounted) setUser(null);
      }finally{
        if(mounted) setLoading(false);
      }
    })();
    return ()=>{ mounted=false };
  },[]);

  return { user, loading };
}


