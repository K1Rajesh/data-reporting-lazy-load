export interface FeatureCardModel{
    iconPath: string;
    cardName: string;
    cardDescription: string;
}

export const sampleFeatureCards: Array<FeatureCardModel> = [
    {
        iconPath: "./assets/retail_0322.png",
        cardName: "Retail",
        cardDescription: "Fast forward your fill"
    },
    {
        iconPath: "./assets/lpg_0322.jpg",
        cardName: "LPG",
        cardDescription: "Bharathgas"
    },
    {
        iconPath: "./assets/lubes_0322.png",
        cardName: "Lubes",
        cardDescription: "Enter a description"
    }
]
