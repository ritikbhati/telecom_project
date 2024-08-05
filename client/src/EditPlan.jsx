import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditPlan() {
  const { id } = useParams();
  const [plan, setPlan] = useState({
    plan_name: '',
    plan_price: '',
    validity: '',
    data: '',
    service: '',
    calls: '',
    sms: '',
    ott_subscriptions: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlan = async () => {
      const res = await fetch(`http://localhost:3000/plans/${id}`);
      const data = await res.json();
      setPlan({
        plan_name: data.plan_name,
        plan_price: data.plan_price,
        validity: data.validity,
        data: data.data,
        service: data.service,
        calls: data.calls,
        sms: data.sms,
        ott_subscriptions: data.ott_subscriptions.join(', '),
      });
    };
    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPlan((prevPlan) => ({
      ...prevPlan,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPlan = {
      ...plan,
      plan_price: parseFloat(plan.plan_price),
      validity: parseInt(plan.validity),
      data: parseFloat(plan.data),
      ott_subscriptions: plan.ott_subscriptions.split(',').map(sub => sub.trim()),
    };

    const res = await fetch(`http://localhost:3000/plans/${id}`, {
      method: 'PUT',
      body: JSON.stringify(updatedPlan),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (res.status === 200) {
      navigate('/');
    } else {
      const errorData = await res.json();
      console.error('Error updating plan:', errorData);
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4">Edit Plan</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Plan Name</label>
              <input
                type="text"
                className="form-control"
                name="plan_name"
                value={plan.plan_name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Plan Price</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="plan_price"
                value={plan.plan_price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Validity (days)</label>
              <input
                type="number"
                className="form-control"
                name="validity"
                value={plan.validity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Data (GB/day)</label>
              <input
                type="number"
                step="0.01"
                className="form-control"
                name="data"
                value={plan.data}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="mb-3">
              <label className="form-label">Service (4G/5G)</label>
              <input
                type="text"
                className="form-control"
                name="service"
                value={plan.service}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Calls</label>
              <input
                type="text"
                className="form-control"
                name="calls"
                value={plan.calls}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">SMS</label>
              <input
                type="text"
                className="form-control"
                name="sms"
                value={plan.sms}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">OTT Subscriptions (comma-separated)</label>
              <input
                type="text"
                className="form-control"
                name="ott_subscriptions"
                value={plan.ott_subscriptions}
                onChange={handleChange}
              />
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
