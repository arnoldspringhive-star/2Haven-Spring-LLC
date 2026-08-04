$files = Get-ChildItem -Filter *.html

$newFooter = @"
  <!-- NEW COMPLIANT FOOTER PLACEHOLDER -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <p>HavenSpring LLC</p>
          <p>469 Dutton Avenue, WI 54304</p>
          <p>Email: <a href="mailto:havenspringllc@gmail.com">havenspringllc@gmail.com</a></p>
          <p>Phone: <a href="tel:414-455-5899">414-455-5899</a></p>
        </div>
        <div class="footer-links-col">
          <h4>Legal & Important Links</h4>
          <ul class="footer-links">
            <li><a href="privacy.html" class="footer-link">Privacy Policy</a></li>
            <li><a href="terms.html" class="footer-link">Terms & Conditions</a></li>
            <li><a href="accessibility.html" class="footer-link">Accessibility Statement</a></li>
            <li><a href="admissions.html" class="footer-link">Admissions</a></li>
            <li><a href="contact.html" class="footer-link">Contact</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
"@

$smsCheckbox = @"
              <div class="form-group checkbox-group" style="margin-top: 15px; margin-bottom: 15px;">
                <input type="checkbox" id="sms_consent" name="sms_consent" value="yes">
                <label for="sms_consent" style="font-size: 0.85em;">By checking this box, you agree to receive SMS messages from HavenSpring LLC related to inquiries, services, or updates. Message frequency may vary. Message and data rates may apply. Reply STOP to opt out or HELP for assistance.</label>
              </div>
"@

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw

    # 1. Replace Footer
    # Matches from <!-- 8. FOOTER or <!-- FOOTER or <footer to </footer>
    $content = $content -replace '(?is)(?:<!--[^>]*FOOTER[^>]*-->\s*)*<footer.*?</footer>', $newFooter

    # 2. Add SMS consent just before <button type="submit" or </form> if button not found, in forms
    if ($content -match '<form') {
        # Check if already added
        if ($content -notmatch 'sms_consent') {
            # Find the submit button and insert the checkbox right before it
            $content = $content -replace '(?i)(\s*<button[^>]*type="submit"[^>]*>)', "`n$smsCheckbox`n`$1"
        }
        
        # Remove SSN/Medical/Financial fields from forms (if any)
        $content = $content -replace '(?is)<div[^>]*>.*?SSN.*?</div>', ''
        $content = $content -replace '(?is)<div[^>]*>.*?Social Security.*?</div>', ''
        $content = $content -replace '(?is)<div[^>]*>.*?Medical Record.*?</div>', ''
        $content = $content -replace '(?is)<div[^>]*>.*?Financial Details.*?</div>', ''
    }

    # 3. Content compliance text replacement
    $content = $content -ireplace '\blicensed\b', 'authorized'
    $content = $content -ireplace '\bcertified\b', 'qualified'
    $content = $content -ireplace 'open and operating', 'planned services'
    $content = $content -ireplace 'accepting residents', 'subject to assessment and availability'
    $content = $content -ireplace 'wheelchair accessible environment', 'Designed to support individuals needing mobility accommodations'
    $content = $content -ireplace 'wheelchair accessible', 'designed to support individuals needing mobility accommodations'

    # Non-medical tone fixes
    $content = $content -ireplace 'medical professionals', 'health care professionals'
    $content = $content -ireplace 'medical staff', 'care staff'
    $content = $content -ireplace 'medical appointments', 'wellness appointments'
    $content = $content -ireplace 'medical choices', 'wellness choices'
    $content = $content -ireplace 'medical support', 'care support'
    $content = $content -ireplace 'medical advice', 'wellness advice'
    $content = $content -ireplace 'medical needs', 'wellness needs'

    Set-Content $file.FullName -Value $content -NoNewline
}

Write-Host "Update completed."


