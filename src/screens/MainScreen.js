import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import googleFit, {BucketUnit, Scopes} from 'react-native-google-fit';

export const MainScreen = () => {
  let todayData = new Date();

  const options = {
    scopes: [
      Scopes.FITNESS_ACTIVITY_READ,
      Scopes.FITNESS_ACTIVITY_WRITE,
      Scopes.FITNESS_BODY_READ,
      Scopes.FITNESS_BODY_WRITE,
    ],
  };

  const stepsOpt = {
    startDate: '2021-09-15T00:00:00.000Z', // the start of the day in question
    endDate: new Date().toISOString(), // required ISO8601Timestamp
    bucketUnit: BucketUnit.DAY, // optional - default "DAY". Valid values: "NANOSECOND" | "MICROSECOND" | "MILLISECOND" | "SECOND" | "MINUTE" | "HOUR" | "DAY"
    bucketInterval: 1, // optional - default 1.
  };

  function entireStepData() {
    const res = googleFit
      .getDailyStepCountSamples(stepsOpt)
      .then(data =>
        console.log(`\n\nMy step data is\n${JSON.stringify(res, null, 2)}\n\n`),
      )
      .catch(console.error);
  }

  function today() {
    googleFit
      .getDailySteps()
      .then(res => console.log(JSON.stringify(res, null, 2)))
      .catch(console.error);
  }

  useEffect(() => {
    googleFit
      .authorize(options)
      .then(authResult => {
        if (authResult.success) {
          console.log('AUTH SUCCESS');
          today();
        } else {
          console.log('AUTH DENIED', authResult);
        }
      })
      .catch(() => {
        console.log('AUTH ERROR');
      });
  }, []);

  return (
    <View style={{alignItems: 'center', marginTop: 35}}>
      <Text style={{fontSize: 30}}>Testing RN Google Fit</Text>
    </View>
  );
};
