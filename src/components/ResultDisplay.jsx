import React from 'react';

const ResultDisplay = ({ current, breaker, totalPower }) => {
    return (
        <div className="result-card">
            <div className="total-power">
                Celkový výpočtový výkon: {totalPower.toFixed(2)} kW
            </div>

            <div className="amp-value">
                {current.toFixed(1)} <span className="amp-unit">A</span>
            </div>

            <div className="breaker-recommendation">
                <span className="breaker-label">Doporučený hlavní jistič</span>
                <span className="breaker-badge">{breaker} A</span>
            </div>
        </div>
    );
};

export default ResultDisplay;
