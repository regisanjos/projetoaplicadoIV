const dashboardService = require('../services/dashboardService');
const { validateFilterOptions } = require('../middlewares/validation');



const dashboardController = {
  
  async getOverview(req, res) {
    try {
      const overviewData = await dashboardService.getOverviewData();
      res.json(overviewData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  
  async getChartData(req, res) {
    try {
      const { chartType } = req.query; 
      const filterOptions = req.query;       
      const chartData = await dashboardService.getChartData(chartType, filterOptions);
      res.json(chartData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = dashboardController;