fetch('/api/data')
  .then(res => res.json())
  .then(data => {
    console.log('Fetched data:', data);
    // Ensure data is an array
    // CalHeatmap v4 expects an array of objects with date and value
    const arr = Array.isArray(data.heatmapData) ? data.heatmapData : [];
    // Find min and max values for color scale
    const valuesArr = arr.map(item => item.value);
    const minValue = Math.min(...valuesArr);
    const maxValue = Math.max(...valuesArr);
    const cal = new CalHeatmap();
    cal.paint({
      data: {
        source: arr,
        x: 'date',
        y: 'value',
        type: 'json',
      },
      range: 12,
      domain: { type: 'month', label: { position: 'top' } },
      subDomain: { type: 'day', radius: 2 },
      scale: { color: { type: 'linear', scheme: 'Reds', domain: [minValue, maxValue > minValue ? maxValue : minValue + 1] } },
      itemSelector: '#heatmap',
    });
  });
