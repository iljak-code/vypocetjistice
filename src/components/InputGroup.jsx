import React, { useEffect } from 'react';

const InputGroup = ({ title, power, setPower, coeff, setCoeff, defaultCoeff, minCoeff, maxCoeff }) => {

    useEffect(() => {
        if (coeff === '') {
            setCoeff(defaultCoeff);
        }
    }, [defaultCoeff, setCoeff]);

    return (
        <div className="panel">
            <h2>{title}</h2>
            <div className="input-row">
                <div className="input-field">
                    <label>Instalovaný příkon (kW)</label>
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
                    <label>Koeficient {minCoeff && maxCoeff ? `(${minCoeff}-${maxCoeff})` : ''}</label>
                    <input
                        type="number"
                        min={minCoeff || "0"}
                        max={maxCoeff || "1"}
                        step="0.01"
                        value={coeff}
                        onChange={(e) => setCoeff(e.target.value)}
                        placeholder={defaultCoeff}
                    />
                </div>
            </div>
        </div>
    );
};

export default InputGroup;
