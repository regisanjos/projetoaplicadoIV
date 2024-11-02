import dashboardService from '../services/dashboardService';
import { validateFilterOptions } from '../middlewares/validation';

const dashboardController = {
  // Obter dados gerais para o dashboard
  async getOverview(req, res) {
    try {
      const overviewData = await dashboardService.getOverviewData();
      res.json(overviewData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Obter dados para gráficos ou tabelas
  async getChartData(req, res) {
    try {
      await validateFilterOptions(req, res, () => {}); // Valida as opções de filtro
      
      const { chartType } = req.query; 
      const filterOptions = req.query; // Obtém as opções de filtro da query string
      
      const chartData = await dashboardService.getChartData(chartType, filterOptions);
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default dashboardController;