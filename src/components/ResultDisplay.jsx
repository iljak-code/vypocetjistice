import React from 'react';

const ResultDisplay = ({ current, breaker, totalPower }) => {
    return (
        <div className="result-card">
            <div className="total-power">
                Celkový výpočtový příkon: <strong>{totalPower.toFixed(2)} kW</strong>
            </div>

            <div className="result-row">
                <div className="breaker-recommendation">
                    <span className="breaker-label">Proud</span>
                    <div className="amp-value">
                        {current.toFixed(1)}<span className="amp-unit">A</span>
                    </div>
                </div>

                <div className="breaker-recommendation">
                    <span className="breaker-label">Doporučený jistič</span>
                    <span className="breaker-badge">{breaker} A</span>
                </div>
            </div>
        </div>
    );
};

export default ResultDisplay;
