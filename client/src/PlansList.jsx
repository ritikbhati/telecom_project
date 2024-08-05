import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function PlansList() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await fetch('http://localhost:3000/plans');
      const data = await res.json();
      setPlans(data);
    };
    fetchPlans();
  }, []);

  const deletePlan = async (id) => {
    const res = await fetch(`http://localhost:3000/plans/${id}`, {
      method: 'DELETE',
    });
    if (res.status === 200) {
      setPlans(plans.filter((plan) => plan._id !== id));
    }
  };

  return (
    <div className="container my-4">
      <h1 className="mb-4 text-center">All Plans</h1>
      <div className="row">
        {plans.map((plan) => (
          <div key={plan._id} className="col-md-4 mb-4">
            <div className="card h-100 border-primary">
              <div className="card-body">
                <h5 className="card-title">{plan.plan_name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">Price: ₹{plan.plan_price}</h6>
                <p className="card-text">Validity: {plan.validity} days</p>
                <p className="card-text">Data: {plan.data} GB/day</p>
                <p className="card-text">Service: {plan.service}</p>
                <p className="card-text">Calls: {plan.calls}</p>
                <p className="card-text">SMS: {plan.sms}</p>
                <p className="card-text">OTT Subscriptions: {plan.ott_subscriptions.join(', ')}</p>
                <div className="d-flex justify-content-between">
                  <Link to={`/edit/${plan._id}`} className="btn btn-warning">
                    <i className="fas fa-edit"></i> Edit
                  </Link>
                  <button onClick={() => deletePlan(plan._id)} className="btn btn-danger">
                    <i className="fas fa-trash"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
