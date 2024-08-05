import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddPlan() {
  const [plan_name, setPlanName] = useState('');
  const [plan_price, setPlanPrice] = useState('');
  const [validity, setValidity] = useState('');
  const [data, setData] = useState('');
  const [service, setService] = useState('');
  const [calls, setCalls] = useState('');
  const [sms, setSms] = useState('');
  const [ott_subscriptions, setOttSubscriptions] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlan = {
      plan_name,
      plan_price: parseFloat(plan_price),
      validity: parseInt(validity),
      data: parseFloat(data),
      service,
      calls,
      sms,
      ott_subscriptions: ott_subscriptions.split(',').map(sub => sub.trim()),
    };

    const res = await fetch('http://localhost:3000/plans', {
      method: 'POST',
      body: JSON.stringify(newPlan),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 201) {
      navigate('/');
      console.log('Success');
    } else {
      const errorData = await res.json();
      console.log(newPlan);
      console.error('Error adding plan:', errorData);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Add New Plan</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Plan Name</label>
              <input type="text" className="form-control" value={plan_name} onChange={(e) => setPlanName(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Plan Price</label>
              <input type="number" step="0.01" className="form-control" value={plan_price} onChange={(e) => setPlanPrice(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Validity (days)</label>
              <input type="number" className="form-control" value={validity} onChange={(e) => setValidity(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Data (GB/day)</label>
              <input type="number" step="0.01" className="form-control" value={data} onChange={(e) => setData(e.target.value)} required />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Service (4G/5G)</label>
              <input type="text" className="form-control" value={service} onChange={(e) => setService(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Calls</label>
              <input type="text" className="form-control" value={calls} onChange={(e) => setCalls(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">SMS</label>
              <input type="text" className="form-control" value={sms} onChange={(e) => setSms(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label className="form-label">OTT Subscriptions (comma-separated)</label>
              <input type="text" className="form-control" value={ott_subscriptions} onChange={(e) => setOttSubscriptions(e.target.value)} />
            </div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          <i className="fas fa-save"></i> Save Plan
        </button>
      </form>
    </div>
  );
}
