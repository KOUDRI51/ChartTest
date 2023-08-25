document.addEventListener('DOMContentLoaded', function () {
    
    const form = document.getElementById('data-form');
    const chart = echarts.init(document.getElementById('chart'));

    
    const colors = ['#FF8369', '#EE7C65', '#DB735E', '#CD715E'];

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const input1 = parseFloat(document.getElementById('input1').value);
        const input2 = parseFloat(document.getElementById('input2').value);
        const input3 = parseFloat(document.getElementById('input3').value);

        if (isNaN(input1) || isNaN(input2) || isNaN(input3)) {
            alert('Please enter valid decimal numbers.');
            return;
        }

       
        const averagePercentage = (input1 + input2 + input3) / 3;

        
        fetch('backend.php', {
            method: 'POST',
            body: JSON.stringify({ input1, input2, input3, averagePercentage }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
        .then((data) => {
            alert(`Average Percentage: ${data.averagePercentage}%`);

            
            chart.setOption({
                title: {
                    text: 'Average Percentage Chart',
                    textStyle: {
                        color: '#FF5733', 
                    },
                },
                color: colors, 
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow', 
                    },
                },
                xAxis: {
                    type: 'category',
                    data: ['AL54', 'CDF', 'FF2', 'Average Percentage'],
                    axisLabel: {
                        rotate: 45, 
                    },
                },
                yAxis: {
                    type: 'value',
                    max: 100,
                    axisLabel: {
                        formatter: '{value}%', 
                    },
                },
                series: [
                    {
                        data: [input1, input2, input3, averagePercentage],
                        type: 'bar',
                        label: {
                            show: true, 
                            position: 'top', 
                        },
                    },
                ],
            });
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    });
});
