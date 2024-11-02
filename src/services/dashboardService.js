import prisma from '../config/db';
import userService from './userService';
import donationService from './donationService';
import disasterService from './disasterService';

const dashboardService = {
  // Obter dados gerais para o dashboard
  async getOverviewData() {
    try {
      const totalUsers = await userService.getTotalUsers();
      const totalDonations = await donationService.getTotalDonations();
      const totalActiveDisasters = await disasterService.getTotalActiveDisasters();
//      const totalDonationsAmount = await donationService.getTotalDonationsAmount();
      const recentUsers = await userService.getRecentUsers();
      const recentDisasters = await disasterService.getRecentDisasters();

      return {
        totalUsers,
        totalDonations,
        totalActiveDisasters,
  //      totalDonationsAmount,
        recentUsers,
        recentDisasters,
      };
    } catch (error) {
      throw new Error(`Erro ao obter dados de visão geral: ${error.message}`);
    }
  },

  // Obter dados para gráficos ou tabelas
  async getChartData(chartType, filterOptions) {
    try {
      switch (chartType) {
        case 'donationsByDisaster':
          return await this.getDonationsByDisaster(filterOptions);
        case 'donationsOverTime':
          return await this.getDonationsOverTime(filterOptions);
        case 'donationsByStatus':
          return await donationService.getDonationsByStatus();
        
        default:
          throw new Error('Tipo de gráfico inválido');
      }
    } catch (error) {
      throw new Error(`Erro ao obter dados do gráfico: ${error.message}`);
    }
  },

  async getDonationsByDisaster(filterOptions) {
    try {
      const { startDate, endDate, disasterIds } = filterOptions;

      const donationsByDisaster = await prisma.donation.groupBy({
        by: ['disasterId'],
        _count: {
          id: true,
        },
        where: {
          ...(startDate && endDate ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } } : {}),
          ...(disasterIds ? { disasterId: { in: disasterIds.map(id => parseInt(id)) } } : {}),
        },
        include: { disaster: true }, // Inclui informações do desastre
      });

      const chartData = donationsByDisaster.map(item => ({
        disasterName: item.disaster.name, // Usa o nome do desastre
        totalDonations: item._count.id,
      }));

      return chartData;
    } catch (error) {
      throw new Error(`Erro ao agrupar doações por desastre: ${error.message}`);
    }
  },

  async getDonationsOverTime(filterOptions) {
    try {
      const { startDate, endDate } = filterOptions;

      const donationsOverTime = await prisma.donation.groupBy({
        by: ['createdAt'], // Agrupa por data de criação (ajuste se necessário)
        _count: {
          id: true,
        },
        where: {
          ...(startDate && endDate ? { createdAt: { gte: new Date(startDate), lte: new Date(endDate) } } : {}),
        },
      });

      const chartData = donationsOverTime.map(item => ({
        date: item.createdAt, 
        totalDonations: item._count.id,
      }));

      return chartData;
    } catch (error) {
      throw new Error(`Erro ao agrupar doações ao longo do tempo: ${error.message}`);
    }
  },
};

export default dashboardService;