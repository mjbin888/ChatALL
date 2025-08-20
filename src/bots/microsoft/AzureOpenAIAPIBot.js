import LangChainBot from "@/bots/LangChainBot";
import store from "@/store";
// Defer importing langchain ChatOpenAI to avoid pulling it into initial bundle

export default class AzureOpenAIAPIBot extends LangChainBot {
  static _brandId = "azureOpenaiApi";
  static _className = "AzureOpenAIAPIBot";
  static _logoFilename = "azure-openai-logo.png";
  static _isDarkLogo = true; // The main color of logo is dark

  constructor() {
    super();
  }

  async checkAvailability() {
    if (
      !store.state.azureOpenaiApi.azureApiKey ||
      !store.state.azureOpenaiApi.azureApiInstanceName ||
      !store.state.azureOpenaiApi.azureOpenAIApiDeploymentName ||
      !store.state.azureOpenaiApi.azureOpenAIApiVersion
    ) {
      this.constructor._isAvailable = false;
    } else {
      const { ChatOpenAI } = await import(
        /* webpackChunkName: "langchain-openai" */ "langchain/chat_models/openai"
      );
      const chatModel = new ChatOpenAI({
        azureOpenAIApiKey: store.state.azureOpenaiApi.azureApiKey,
        azureOpenAIApiInstanceName:
          store.state.azureOpenaiApi.azureApiInstanceName,
        azureOpenAIApiDeploymentName:
          store.state.azureOpenaiApi.azureOpenAIApiDeploymentName,
        azureOpenAIApiVersion: store.state.azureOpenaiApi.azureOpenAIApiVersion,
        temperature: store.state.azureOpenaiApi.temperature,
        streaming: true,
      });
      this.constructor._chatModel = chatModel;
      this.constructor._isAvailable = true;
    }
    return this.isAvailable();
  }

  getPastRounds() {
    return store.state.azureOpenaiApi.pastRounds;
  }
}
