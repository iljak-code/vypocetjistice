import React, { useState, useMemo } from 'react';
import InputGroup from './components/InputGroup';
import ResultDisplay from './components/ResultDisplay';
import ContactSection from './components/ContactSection';
import Disclaimer from './components/Disclaimer';

const BREAKER_VALUES = [16, 20, 25, 32, 40, 50, 63, 80, 100, 125, 160, 200, 250, 315, 400, 500, 630];

function App() {
    // Global Settings
    const [cosPhi, setCosPhi] = useState(0.9);

    // Group 1: 230V
    const [power1, setPower1] = useState('');
    const [coeff1, setCoeff1] = useState(0.7);

    // Group 2: 400V (Variable)
    const [power2, setPower2] = useState('');
    const [coeff2, setCoeff2] = useState(0.7);

    // Group 3: Energy System
    const [power3, setPower3] = useState('');
    const [coeff3, setCoeff3] = useState(0.4);

    const { totalPower, current, recommendedBreaker } = useMemo(() => {
        const p1 = parseFloat(power1) || 0;
        const c1 = parseFloat(coeff1) || 0;

        const p2 = parseFloat(power2) || 0;
        const c2 = parseFloat(coeff2) || 0;

        const p3 = parseFloat(power3) || 0;
        const c3 = parseFloat(coeff3) || 0;

        const pf = parseFloat(cosPhi) || 0.9;

        const pTotal = (p1 * c1) + (p2 * c2) + (p3 * c3); // Total Power in kW

        // I = P * 1000 / (sqrt(3) * 400 * cosPhi)
        const iCalc = (pTotal > 0 && pf > 0) ? (pTotal * 1000) / (Math.sqrt(3) * 400 * pf) : 0;

        let breaker = BREAKER_VALUES.find(b => b >= iCalc);

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
    }, [power1, coeff1, power2, coeff2, power3, coeff3, cosPhi]);

    return (
        <div className="container">
            <h1>Gastro Kalkulačka Jističe</h1>

            <div className="global-settings">
                <h2>Nastavení</h2>
                <div className="input-field">
                    <label>Účiník ($\cos \phi$)</label>
                    <input
                        type="number"
                        min="0.7"
                        max="1.0"
                        step="0.01"
                        value={cosPhi}
                        onChange={(e) => setCosPhi(e.target.value)}
                    />
                </div>
            </div>

            <InputGroup
                title="1. Spotřebiče 230V"
                power={power1}
                setPower={setPower1}
                coeff={coeff1}
                setCoeff={setCoeff1}
                defaultCoeff={0.7}
            />

            <InputGroup
                title="2. Spotřebiče 400V"
                power={power2}
                setPower={setPower2}
                coeff={coeff2}
                setCoeff={setCoeff2}
                defaultCoeff={0.7}
                minCoeff={0.4}
                maxCoeff={0.9}
            />

            <InputGroup
                title="3. Energy System (optimalizace)"
                power={power3}
                setPower={setPower3}
                coeff={coeff3}
                setCoeff={setCoeff3}
                defaultCoeff={0.4}
            />

            <ResultDisplay
                current={current}
                breaker={recommendedBreaker}
                totalPower={totalPower}
            />

            <ContactSection />
            <Disclaimer />
        </div>
    );
}

export default App;
