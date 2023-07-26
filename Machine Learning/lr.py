#Breast Cancer Prediction using Logistic Regression

#importing libraries
import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

#importing dataset
dataset = pd.read_csv('data.csv')
X = dataset.iloc[:, 2:-1].values
y = dataset.iloc[:, 1].values

#encoding the dependent variable
le = LabelEncoder()
y = le.fit_transform(y)

# 0 - Benign (Non-Cancerous)

# 1- Malignant (Cancerous)

#splitting dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

#training dataset
regressor = LogisticRegression()
regressor.fit(X_train, y_train)

#evaluating model
#cofusion matrix & accuracy score
from sklearn.metrics import confusion_matrix, accuracy_score
y_pred = regressor.predict(X_test)
print("The connfusion matrix for the model is : \n")
print(confusion_matrix(y_test, y_pred))
print("Total accuracy of the model is : ", accuracy_score(y_test, y_pred))

#building a predictive system
input_data = (13.54,14.36,87.46,566.3,0.09779,0.08129,0.06664,0.04781,0.1885,0.05766,0.2699,0.7886,2.058,23.56,0.008462,0.0146,0.02387,0.01315,0.0198,0.0023,15.11,19.26,99.7,711.2,0.144,0.1773,0.239,0.1288,0.2977,0.07259)
input_data_as_nparray = np.asarray(input_data)
input_data_reshaped = input_data_as_nparray.reshape(1, -1)
prediction = regressor.predict(input_data_reshaped)
print(prediction)

if prediction[0] == 0:
    print('The Breast Cancer is Benign')
else:
    print('The Breast Cancer is Malignant')