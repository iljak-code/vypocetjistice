import React, { useEffect } from 'react';

const InputGroup = ({ title, power, setPower, coeff, setCoeff, defaultCoeff }) => {

    // Set default coefficient on mount if not provided or empty
    useEffect(() => {
        if (coeff === '') {
            setCoeff(defaultCoeff);
        }
    }, [defaultCoeff, setCoeff]); // Don't depend on coeff to avoid loop

    return (
        <div className="glass-panel">
            <h2>{title}</h2>
            <div className="input-grid">
                <div className="input-field">
                    <label>Instalovaný výkon (kW)</label>
                    <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={power}
                        onChange={(e) => setPower(e.target.value === '' ? '' : Math.max(0, parseFloat(e.target.value)))}
                        placeholder="0"
                    />
                </div>
                <div className="input-field">
                    <label>Koeficient soudobosti</label>
                    <input
                        type="number"
                        min="0.1"
                        max="1"
                        step="0.01"
                        value={coeff}
                        onChange={(e) => {
                            const val = parseFloat(e.target.value);
                            // Allow typing by checking if valid number or empty, constraint applied better on blur or handled loosely
                            setCoeff(e.target.value);
                        }}
                        placeholder={defaultCoeff}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputGroup;
