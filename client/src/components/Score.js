import React from 'react';
import { Doughnut } from 'react-chartjs-2';

const Score = (props) => {

    function allocateSpace() {
        if(props.score > 2){
            return [0, 5, 95]
        } else if(props.score === 2) {
            return [10, 20, 70]
        } else if(props.score === 1) {
            return [33, 33, 33]
        } else {
            return [70, 20, 10]
        }
    }

    const data = {
        datasets: [
            {
                data: allocateSpace(),
                backgroundColor: [
                    "red",
                    "yellow",
                    "green",
                ],
                borderColor: `rgba(0, 0, 0, .5)`,
                borderWidth: 1
            }
        ],
        labels: [
            'Danger',
            'Uncertain',
            'Safe'
        ]
    };

    return(
        <div>
            <Doughnut
                data={data}
                width={100}
                height={100}
                options={{
                    circumference: Math.PI,
                    rotation: -Math.PI,
                    maintainAspectRatio: false,
                    legend: {display: false}
                }}
            />
        </div>
    );
}

export default Score;