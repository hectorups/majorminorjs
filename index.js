module.exports = {
  unsignedIntToByteArray: function(unsignedInt) {
    var byteArray = [0, 0, 0, 0];

    for ( var index = 0; index < byteArray.length; index ++ ) {
        var byte = unsignedInt & 0xff;
        byteArray[ index ] = byte;
        unsignedInt = (unsignedInt - byte) / 256 ;
    }

    return byteArray;
  },

  byteArrayToUnsignedInt: function(byteArray) {
      var value = 0;
      for (var i = byteArray.length - 1; i >= 0; i--) {
          value = (value * 256) + byteArray[i];
      }

      return value;
  },

  numberToMajorMinor: function(number) {
    var byteArray = this.unsignedIntToByteArray(number);

    return new Object({
      major: this.byteArrayToUnsignedInt([byteArray[2], byteArray[3]]),
      minor: this.byteArrayToUnsignedInt([byteArray[0], byteArray[1]])
    });
  },

  majorMinorToNumber: function(majorminor) {
    var majorByteArray = this.unsignedIntToByteArray(majorminor.major);
    var minorByteArray = this.unsignedIntToByteArray(majorminor.minor);
    return this.byteArrayToUnsignedInt([
        minorByteArray[0], minorByteArray[1], majorByteArray[0], majorByteArray[1]
      ]);
  }

}
