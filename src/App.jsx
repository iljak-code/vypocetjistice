import React, { useState, useMemo } from 'react';
import InputGroup from './components/InputGroup';
import ResultDisplay from './components/ResultDisplay';

const BREAKER_VALUES = [125, 160, 200, 250, 315, 400, 500, 630];

function App() {
    const [powerA, setPowerA] = useState('');
    const [coeffA, setCoeffA] = useState(0.7);
    const [powerB, setPowerB] = useState('');
    const [coeffB, setCoeffB] = useState(0.4);

    const { totalPower, current, recommendedBreaker } = useMemo(() => {
        const pA = parseFloat(powerA) || 0;
        const cA = parseFloat(coeffA) || 0;
        const pB = parseFloat(powerB) || 0;
        const cB = parseFloat(coeffB) || 0;

        const pTotal = (pA * cA) + (pB * cB); // Total Power in kW

        // I = P / (sqrt(3) * U * cosPhi)
        // I = (P * 1000) / (1.73205 * 400 * 0.9)
        // Denominator = 623.538
        const iCalc = pTotal > 0 ? (pTotal * 1000) / (Math.sqrt(3) * 400 * 0.9) : 0;

        let breaker = BREAKER_VALUES.find(b => b >= iCalc);

        // Handle case where calculated current exceeds max standard breaker
        if (!breaker && iCalc > 0) {
            if (iCalc > 630) breaker = 'Individuální (>630)';
            else breaker = 'N/A';
        } else if (iCalc === 0) {
            breaker = '-';
        }

        return {
            totalPower: pTotal,
            current: iCalc,
            recommendedBreaker: breaker
        };
    }, [powerA, coeffA, powerB, coeffB]);

    return (
        <div className="container">
            <h1>Gastro Kalkulačka Jističe</h1>

            <InputGroup
                title="Skupina A (Standardní)"
                power={powerA}
                setPower={setPowerA}
                coeff={coeffA}
                setCoeff={setCoeffA}
                defaultCoeff={0.7}
            />

            <InputGroup
                title="Skupina B (Log-IQ)"
                power={powerB}
                setPower={setPowerB}
                coeff={coeffB}
                setCoeff={setCoeffB}
                defaultCoeff={0.4}
            />

            <ResultDisplay
                current={current}
                breaker={recommendedBreaker}
                totalPower={totalPower}
            />
        </div>
    );
}

export default App;
