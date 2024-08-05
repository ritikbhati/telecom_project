export default function Plan(props) {
    const { plan, setPlans } = props;

    const updatePlan = async (planId, updatedFields) => {
        const res = await fetch(`/api/plans/${planId}`, {
            method: "PUT",
            body: JSON.stringify(updatedFields),
            headers: {
                "Content-Type": "application/json"
            },
        });

        const json = await res.json();
        if (json.acknowledged) {
            setPlans(currentPlans => {
                return currentPlans.map((currentPlan) => {
                    if (currentPlan._id === planId) {
                        return { ...currentPlan, ...updatedFields };
                    }
                    return currentPlan;
                });
            });
        }
    };

    const deletePlan = async (planId) => {
        const res = await fetch(`/api/plans/${planId}`, {
            method: "DELETE"
        });
        const json = await res.json();
        if (json.acknowledged) {
            setPlans(currentPlans => {
                return currentPlans.filter((currentPlan) => (currentPlan._id !== planId));
            });
        }
    };

    return (
        <div className="plan">
            <p>Name: {plan.plan_name}</p>
            <p>Price: ${plan.plan_price}</p>
            <p>Validity: {plan.validity} days</p>
            <p>Data: {plan.data} GB/day</p>
            <p>Service: {plan.service}</p>
            <p>Calls: {plan.calls}</p>
            <p>SMS: {plan.sms}</p>
            <p>OTT Subscriptions: {plan.ott_subscriptions.join(', ')}</p>
            <div className="mutations">
                <button
                    className="plan__update"
                    onClick={() => updatePlan(plan._id, { plan_price: plan.plan_price + 10 })}
                >
                    Increase Price
                </button>
                <button
                    className="plan__delete"
                    onClick={() => deletePlan(plan._id)}
                >
                    🗑️
                </button>
            </div>
        </div>
    )
}
