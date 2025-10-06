import { prepareChartData } from '@/lib/movementsUtils';

describe('prepareChartData', () => {
  it('clasifica correctamente ingresos y egresos', () => {
    const data = [
      { concept: 'Pago', amount: 100 },
      { concept: 'Compra', amount: -50 },
    ];

    const result = prepareChartData(data);

    expect(result).toEqual([
      { concept: 'Pago', type: 'Ingreso', amount: 100 },
      { concept: 'Compra', type: 'Egreso', amount: 50 },
    ]);
  });
});
