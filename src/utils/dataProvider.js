import axios from 'axios';

const formatResponse = (data, message = null) => ({
  success: true,
  data,
  message
});

const formatError = (message, code = 'UNKNOWN_ERROR') => ({
  success: false,
  error: { code, message }
});

const providers = {
  localStorage: {
    async loadData(key, date) {
      try {
        // 检查是否设置了班号
        const classNumber = key.split('/').pop();
        if (!classNumber) {
          return formatError('请先设置班号', 'CONFIG_ERROR');
        }

        // 使用班号作为本地存储的前缀
        const storageKey = `homework_${classNumber}_${date}`;
        const rawData = localStorage.getItem(storageKey);

        if (!rawData) {
          // 如果是今天的数据且没有找到，返回空结构而不是null
          const today = new Date().toISOString().split('T')[0];
          if (date === today) {
            return formatResponse({
              homework: {},
              attendance: { absent: [], late: [] }
            });
          }
          return formatError('数据不存在', 'NOT_FOUND');
        }

        return formatResponse(JSON.parse(rawData));
      } catch (error) {

        return formatError('读取本地数据失败');
      }
    },

    async saveData(key, data, date) {
      try {
        // 检查是否设置了班号
        const classNumber = key.split('/').pop();
        if (!classNumber) {
          return formatError('请先设置班号', 'CONFIG_ERROR');
        }

        // 使用班号作为本地存储的前缀
        const storageKey = `homework_${classNumber}_${date}`;
        localStorage.setItem(storageKey, JSON.stringify(data));
        return formatResponse(null, '保存成功');
      } catch (error) {
        return formatError('保存本地数据失败');
      }
    },

    async loadConfig(key) {
      try {
        const classNumber = key.split('/').pop();
        if (!classNumber) {
          return formatError('请先设置班号', 'CONFIG_ERROR');
        }

        const storageKey = `config_${classNumber}`;
        const rawData = localStorage.getItem(storageKey);

        if (!rawData) {
          return formatResponse({
            studentList: [],
            displayOptions: {}
          });
        }

        return formatResponse(JSON.parse(rawData));
      } catch (error) {
        return formatError('读取本地配置失败');
      }
    },

    async saveConfig(key, config) {
      try {
        const classNumber = key.split('/').pop();
        if (!classNumber) {
          return formatError('请先设置班号', 'CONFIG_ERROR');
        }

        const storageKey = `config_${classNumber}`;
        localStorage.setItem(storageKey, JSON.stringify(config));
        return formatResponse(null, '保存成功');
      } catch (error) {
        return formatError('保存本地配置失败');
      }
    }
  },

  server: {
    async loadData(key, date) {
      try {
        const res = await axios.get(`${key}/homework?date=${date}`);
        if (res.data?.status === false) {
          return formatError(res.data.msg || '获取数据失败', 'SERVER_ERROR');
        }
        return formatResponse(res.data);
      } catch (error) {
        return formatError(
          error.response?.data?.message || '服务器连接失败',
          'NETWORK_ERROR'
        );
      }
    },

    async saveData(key, data) {
      try {
        await axios.post(`${key}/homework`, data);
        return formatResponse(null, '保存成功');
      } catch (error) {
        return formatError(
          error.response?.data?.message || '保存失败',
          'SAVE_ERROR'
        );
      }
    },

    async loadConfig(key) {
      try {
        const res = await axios.get(`${key}/config`);
        if (res.data?.status === false) {
          return formatError(res.data.msg || '获取配置失败', 'SERVER_ERROR');
        }
        return formatResponse(res.data);
      } catch (error) {
        return formatError(
          error.response?.data?.message || '服务器连接失败',
          'NETWORK_ERROR'
        );
      }
    },

    async saveConfig(key, config) {
      try {
        const res = await axios.post(`${key}/config`, config);
        if (res.data?.status === false) {
          return formatError(res.data.msg || '保存失败', 'SAVE_ERROR');
        }
        return formatResponse(null, '保存成功');
      } catch (error) {
        return formatError(
          error.response?.data?.message || '保存失败',
          'SAVE_ERROR'
        );
      }
    }
  }
};

export default {
  loadData: (provider, key, date) => providers[provider]?.loadData(key, date),
  saveData: (provider, key, data, date) => providers[provider]?.saveData(key, data, date),
  loadConfig: (provider, key) => providers[provider]?.loadConfig(key),
  saveConfig: (provider, key, config) => providers[provider]?.saveConfig(key, config)
};

export const ErrorCodes = {
  NOT_FOUND: '数据不存在',
  NETWORK_ERROR: '网络连接失败',
  SERVER_ERROR: '服务器错误',
  SAVE_ERROR: '保存失败',
  CONFIG_ERROR: '配置错误',
  UNKNOWN_ERROR: '未知错误'
};
