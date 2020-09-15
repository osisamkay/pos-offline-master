
package com.offlinepos;

import android.widget.Toast;
import android.net.Uri;
import android.content.Intent;
import android.content.IntentFilter;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import java.util.Map;
import java.util.HashMap;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import javax.annotation.Nullable;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;
import android.telephony.TelephonyManager;
import androidx.localbroadcastmanager.content.LocalBroadcastManager;
import com.offlinepos.USSDService;


public class USSDDialModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;
  private LocalBroadcastReceiver  mLocalBroadcastReceiver;
private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
USSDDialModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
    this.mLocalBroadcastReceiver = new LocalBroadcastReceiver();
    LocalBroadcastManager localBroadcastManager = LocalBroadcastManager.getInstance(reactContext);
    localBroadcastManager.registerReceiver(mLocalBroadcastReceiver, new IntentFilter("my-custom-event"));
  }
@Override
  public String getName() {
    return "USSDDial";
  }
@Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }
@ReactMethod
  public void dial(String code) { 
Intent callIntent = new Intent(Intent.ACTION_CALL, ussdToCallableUri(code));
     callIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
     reactContext.startActivity(callIntent);
  }
private void sendEvent(ReactContext reactContext,
                       String eventName,
                       @Nullable WritableMap params) {
  reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
}
public class LocalBroadcastReceiver extends BroadcastReceiver {
         @Override
         public void onReceive(Context context, Intent intent) {
               String someData = intent.getStringExtra("my-extra-data");
               WritableMap params = Arguments.createMap();
               params.putString("eventProperty", someData);
               sendEvent(reactContext, "EventReminder", params);
         }
   }
private Uri ussdToCallableUri(String ussd) {
        String uriString = "";
        if(!ussd.startsWith("tel:")){
            uriString += "tel:";
        }
for(char c : ussd.toCharArray()) {
            if(c == '#'){
                uriString += Uri.encode("#");
            }else{
                uriString += c;
            }            
        }
        return Uri.parse(uriString);
    }
}