import { TestSet, TestRunner } from 'alsatian';
import { TapBark } from 'tap-bark';

// create test set
const testSet = TestSet.create();

// add your tests
testSet.addTestsFromFiles('./**/*.spec.ts');

// create a test runner
const testRunner = new TestRunner();

// setup the output
testRunner.outputStream
  // this will use alsatian's default output if you remove this
  // you'll get TAP or you can add your favourite TAP reporter in it's place
  .pipe(TapBark.create().getPipeable())
  // pipe to the console
  .pipe(process.stdout);

// run the test set
testRunner.run(testSet);
