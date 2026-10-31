class Solution {
public:
    int numDecodings(string s) {
        const int mod = 1000000007;
        int n = s.size();
        if (n == 0) return 0;

        vector<long long> dp(n + 1, 0);
        dp[0] = 1;

        if (s[0] == '*') dp[1] = 9;
        else if (s[0] != '0') dp[1] = 1;
        else return 0;

        for (int i = 2; i <= n; i++) {
            char c1 = s[i - 1];
            char c0 = s[i - 2];

            if (c1 == '*')
                dp[i] = (dp[i] + 9 * dp[i - 1]) % mod;
            else if (c1 != '0')
                dp[i] = (dp[i] + dp[i - 1]) % mod;

            if (c0 == '*' && c1 == '*')
                dp[i] = (dp[i] + 15 * dp[i - 2]) % mod;
            else if (c0 == '*') {
                if (c1 >= '0' && c1 <= '6')
                    dp[i] = (dp[i] + 2 * dp[i - 2]) % mod;
                else
                    dp[i] = (dp[i] + dp[i - 2]) % mod;
            } else if (c1 == '*') {
                if (c0 == '1')
                    dp[i] = (dp[i] + 9 * dp[i - 2]) % mod;
                else if (c0 == '2')
                    dp[i] = (dp[i] + 6 * dp[i - 2]) % mod;
            } else {
                int two = (c0 - '0') * 10 + (c1 - '0');
                if (two >= 10 && two <= 26)
                    dp[i] = (dp[i] + dp[i - 2]) % mod;
            }
        }

        return dp[n];
    }
};