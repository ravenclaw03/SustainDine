#Breast Cancer Prediction using Deep Learning(ANN - Artificial Neural Network)

#importing libraries
import numpy as np
import pandas as pd
import tensorflow as tf
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import confusion_matrix, accuracy_score

#importing dataset
dataset = pd.read_csv('data.csv')
X = dataset.iloc[:, 2:-1].values
y = dataset.iloc[:, 1].values

#encoding the dependent variable
le = LabelEncoder()
y = le.fit_transform(y)

# 0 - Benign (Non-Cancerous)

# 1 - Malignant (Cancerous)

#splitting dataset into training set and test set
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size = 0.2, random_state = 0)

#applying feature scalling
from sklearn.preprocessing import StandardScaler
sc = StandardScaler()
X_train = sc.fit_transform(X_train)
X_test = sc.transform(X_test)

#building ANN

#initializing ANN
ann = tf.keras.models.Sequential()
#adding the 1st hidden input layer
ann.add(tf.keras.layers.Dense(units = 6, activation = 'relu'))
#adding the 2nd hidden input layer
ann.add(tf.keras.layers.Dense(units = 6, activation = 'relu'))
#adding the output layer
ann.add(tf.keras.layers.Dense(units = 1, activation = 'sigmoid'))

#training ANN

#compiling ANN
ann.compile(optimizer = 'adam', loss = 'binary_crossentropy', metrics = ['accuracy'])
#training ANN on training set
ann.fit(X_train, y_train, batch_size = 32, epochs = 100)

#evaluating model
#confusion matrix & accuracy score
y_pred = ann.predict(X_test)
y_pred = (y_pred > 0.5)
print("The confusion matrix for the model is : \n")
print(confusion_matrix(y_test, y_pred))
print("Total accuracy of the model: ", accuracy_score(y_test, y_pred))

#building a predictive system
input_data = (11.76,21.6,74.72,427.9,0.08637,0.04966,0.01657,0.01115,0.1495,0.05888,0.4062,1.21,2.635,28.47,0.005857,0.009758,0.01168,0.007445,0.02406,0.001769,12.98,25.72,82.98,516.5,0.1085,0.08615,0.05523,0.03715,0.2433,0.06563)
input_data_as_nparray = np.asarray(input_data)
input_data_reshaped = input_data_as_nparray.reshape(1,-1)
input_data_std = sc.transform(input_data_reshaped)
prediction = ann.predict(input_data_std)
print(prediction)
prediction_label = [np.argmax(prediction)]
print(prediction_label)

if(prediction_label[0] == 0):
  print('The tumor is Benign')
else:
  print('The tumor is Malignant')