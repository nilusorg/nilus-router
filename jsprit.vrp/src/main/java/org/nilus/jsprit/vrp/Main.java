package org.nilus.jsprit.vrp;

import ch.hsr.geohash.GeoHash;

import java.io.IOException;

public class Main {

    public static void main(String[] args) throws IOException {
        // for (int i = 1; i <= 10; i++) {
        //     System.out.println(GeoHash.withCharacterPrecision(48.132432,16.28546, i));
        // }
        new BicycleMessenger().init(args);
    }
}
