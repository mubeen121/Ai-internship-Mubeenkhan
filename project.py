import pandas as pd
import os

# Step 1: Load the dataset
df = pd.read_csv("titanic.csv")
print("Initial shape:", df.shape)
print(df.head())
 
# Step 2: Inspect missing values
print("\nMissing values per column:\n", df.isnull().sum())
 
# Step 3: Clean missing values
# Fill missing Age with the median age
if "Age" in df.columns:
    df["Age"] = df["Age"].fillna(df["Age"].median())
 
# Fill missing Embarked with the most common port
if "Embarked" in df.columns:
    df["Embarked"] = df["Embarked"].fillna(df["Embarked"].mode()[0])
 
# Drop the Cabin column - too many missing values to be useful
if "Cabin" in df.columns:
    df = df.drop(columns=["Cabin"])
 
# Step 4: Generate summary statistics
print("\nSummary statistics:\n", df.describe())
 
# Step 5: Exploratory Data Analysis
survival_rate = df["Survived"].mean() * 100
survival_by_class = df.groupby("Pclass")["Survived"].mean() * 100
survival_by_gender = df.groupby("Sex")["Survived"].mean() * 100
avg_fare_by_class = df.groupby("Pclass")["Fare"].mean()
 
print(f"\nOverall survival rate: {survival_rate:.2f}%")
print("\nSurvival rate by passenger class (%):\n", survival_by_class)
print("\nSurvival rate by gender (%):\n", survival_by_gender)
print("\nAverage fare by class:\n", avg_fare_by_class)
 
# Step 6: Save cleaned dataset
os.makedirs("data", exist_ok=True)
df.to_csv("data/titanic_cleaned.csv", index=False)
print("\nCleaned dataset saved to data/titanic_cleaned.csv")
