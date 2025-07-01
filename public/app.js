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
    cal.addTemplates(fiveMinTemplate);
    cal.paint({
      data: {
        source: arr,
        x: 'date',
        y: 'value'
      },
      range: 24,
      domain: { type: 'hour', label: { position: 'top' } },
      subDomain: { type: 'fiveMin' },
      scale: { color: { type: 'diverging', scheme: 'Greens', domain: [0, 60], symmetric: true, pivot: 40 } },
      itemSelector: '#heatmap',
      date: { start: new Date('2025-06-24T00:00:00') },
    }, [
      [Tooltip, {
        text: function(timestamp, value) {
          return new Date(timestamp).toISOString() + ': ' + value + ' minutes';
        }
      }],
      [Legend]
    ]);
  });
