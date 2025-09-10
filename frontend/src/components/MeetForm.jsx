import { useForm } from 'react-hook-form';
import { addMinutes, format } from 'date-fns';
import { createMeet } from '../services/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function MeetForm(){
  const navigate=useNavigate();
  const now=new Date();
  // datetime-local expects yyyy-MM-ddTHH:mm (no seconds)
  const defaultStart=format(now, "yyyy-MM-dd'T'HH:mm");
  const defaultEnd=format(addMinutes(now,30), "yyyy-MM-dd'T'HH:mm");

  const { register, handleSubmit, formState:{ errors, isSubmitting }, reset }=useForm({
    defaultValues: {
      summary:'Team Sync',
      description:'Created from frontend',
      start: defaultStart,
      end: defaultEnd,
      attendees:''
    }
  });

  const toIsoWithOffset=(local)=>{
    // Convert 'yyyy-MM-ddTHH:mm' (local) → 'yyyy-MM-ddTHH:mm:00±HH:MM'
    const d=new Date(local);
    const pad=(n)=>String(n).padStart(2,'0');
    const tz=-d.getTimezoneOffset();
    const sign=tz>=0?'+':'-';
    const abs=Math.abs(tz);
    const offH=pad(Math.floor(abs/60));
    const offM=pad(abs%60);
    const yyyy=d.getFullYear();
    const MM=pad(d.getMonth()+1);
    const DD=pad(d.getDate());
    const hh=pad(d.getHours());
    const mm=pad(d.getMinutes());
    const ss='00';
    return `${yyyy}-${MM}-${DD}T${hh}:${mm}:${ss}${sign}${offH}:${offM}`;
  };

  const onSubmit=async (values)=>{
    const attendees=(values.attendees||'').split(',').map(s=>s.trim()).filter(Boolean);
    const payload={
      summary: values.summary,
      description: values.description,
      start: toIsoWithOffset(values.start),
      end: toIsoWithOffset(values.end),
      attendees
    };
    try{
      const res=await createMeet(payload);
      toast.success('Google Meet created');
      // Optionally, you could store res.data.savedId in state if needed
      reset();
      navigate('/dashboard', { replace:true });
    }catch(e){
      toast.error(e?.response?.data?.message || 'Failed to create meeting');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Summary</label>
        <input className="mt-1 w-full border rounded px-3 py-2" {...register('summary', { required:true })} />
        {errors.summary && <p className="text-red-600 text-sm mt-1">Required</p>}
      </div>
      <div>
        <label className="block text-sm font-medium">Description</label>
        <input className="mt-1 w-full border rounded px-3 py-2" {...register('description')} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">Start (ISO)</label>
          <input className="mt-1 w-full border rounded px-3 py-2" type="datetime-local" {...register('start', { required:true })} />
          {errors.start && <p className="text-red-600 text-sm mt-1">Required</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">End (ISO)</label>
          <input className="mt-1 w-full border rounded px-3 py-2" type="datetime-local" {...register('end', { required:true })} />
          {errors.end && <p className="text-red-600 text-sm mt-1">Required</p>}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium">Attendees (comma separated)</label>
        <input className="mt-1 w-full border rounded px-3 py-2" placeholder="a@example.com, b@example.com" {...register('attendees')} />
      </div>
      <button disabled={isSubmitting} className="px-5 py-2.5 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 shadow">{isSubmitting? 'Creating...' : 'Create Meet'}</button>
    </form>
  );
}


